export default function NotFound(props: { request: Request }) {
    const { request } = props;
    return (
        <div className="container mx-auto flex flex-col gap-4 p-4">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-2xl">Page not found</p>

            <hr />

            <a className="text-blue-500 underline font-bold hover:text-blue-600 visited:text-purple-600" href="/">Go to home</a>

            <details className="border-2 border-red-600 border-dashed p-2 text-red-600 bg-red-50">
                <summary className="">
                    <h2 className="inline-block mr-2 font-bold">Technical request details: </h2>
                    <p className="inline-block">{request.url}</p>
                </summary>

                <div className="space-y-4 mt-2">

                    <table className="table-auto w-full text-xs text-red-600 border-collapse border border-red-800 p-2">
                        <thead>
                            <tr>
                                <th className="border border-red-800 p-1">Header</th>
                                <th className="border border-red-800 p-1">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(request.headers. entries()).map(([key, value]) => (
                                <tr key={key}>
                                    <td className="border border-red-800 p-1">{key}</td>
                                    <td className="border border-red-800 p-1">{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                    <hr />

                    <code className="overflow-x-auto">
                        Request raw dump:
                        <pre className="text-xs">{JSON.stringify(request, null, 2)}</pre>

                        ---------------------

                        <pre className="text-xs">Method: {request.method}</pre>
                        <pre className="text-xs">Content-Type: {JSON.stringify(request.headers.get("content-type"), null, 2)}</pre>
                        <pre className="text-xs">Content-Length: {JSON.stringify(request.headers.get("content-length"), null, 2)}</pre>
                        <pre className="text-xs">Accept: {JSON.stringify(request.headers.get("accept"), null, 2)}</pre>
                        <pre className="text-xs">Accept-Encoding: {JSON.stringify(request.headers.get("accept-encoding"), null, 2)}</pre>
                    </code>
                </div>
            </details>
        </div>
    )
}