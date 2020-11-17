import { HttpResponse } from "./data-structures";

export function getSafeUrl( base: string, ...args: string[] ): string
{
    const impureUrl = [ ...args ].join( "/" );
    const pureUrl   = safeReplaceAll( impureUrl, "//", "/" );

    const safeBase  = base.endsWith( "/" ) ? base.slice( 0, -1 ) : base;
    const endpoint  = pureUrl.startsWith( "/" ) ? pureUrl : "/" + pureUrl;

    return safeBase + endpoint;
}

export function safeReplaceAll( input: string, substr: string, newSubstr: string ): string
{
    input     = input || "";
    substr    = substr || "";
    newSubstr = newSubstr || "";

    while ( input.indexOf( substr ) > -1 )
    {
        input = input.replace( substr, newSubstr );
    }

    return input;
}

interface FetchConfiguration
{
    method  : string,
    headers : { [ key: string ]: string },
    body?   : any
}

export function httpClient(
    method  : string,
    url     : string,
    headers : { [ key: string ]: string },
    payload?: any
): Promise< HttpResponse >
{
    return new Promise( ( resolve, reject ) =>
    {
        const fetchConfiguration: FetchConfiguration =
        {
            method,
            headers
        }

        if ( payload )
        {
            fetchConfiguration[ "body" ] = JSON.stringify( payload );
        }

        window.fetch( url, fetchConfiguration )
            .then( ( response: Response ) =>
            {
                const headerEntries = response.headers.entries();
                const headers: { [ key: string ]: string } = {};

                for ( const entry of headerEntries )
                {
                    headers[ entry[ 0 ] ] = entry[ 1 ];
                }

                const httpResponse: HttpResponse = {
                    httpStatus: response.status,
                    headers
                }

                response.text()
                    .then( ( data ) =>
                    {
                        try
                        {
                            const jsonData = JSON.parse( data );
                            httpResponse[ "data" ] = jsonData;
                        }
                        catch
                        {
                            httpResponse[ "data" ] = data;
                        }

                        resolve( httpResponse );
                    } )
                    .catch( ( error ) =>
                    {
                        httpResponse[ "data" ] = error;
                        reject( httpResponse );
                    } );
            } )
            .catch( error =>
            {
                reject( {
                    httpStatus: -1,
                    headers: {},
                    data: error
                } );
            });
    } );
}

export function deepCompare( a: any, b: any ): boolean
{
    const isObject = ( a: any ): boolean => a !== null && typeof a === "object";

    const keys1 = Object.keys( a );
    const keys2 = Object.keys( b );

    if ( keys1.length !== keys2.length )
    {
        return false;
    }

    for ( const key of keys1 )
    {
        const val1 = a[ key ];
        const val2 = b[ key ];
        const areObjects = isObject( val1 ) && isObject( val2 );

        if (
            areObjects && !deepCompare( val1, val2 ) ||
            !areObjects && val1 !== val2
        ) {
            return false;
        }
    }

    return true;
}

export function imageDataToBase64( imageData: ImageData ): string
{
    const canvas = document.createElement( "canvas" );

    canvas.width = imageData.width;
    canvas.height = imageData.height;

    const context = canvas.getContext( "2d" );
    context?.putImageData( imageData, 0, 0 );

    return canvas.toDataURL();
}