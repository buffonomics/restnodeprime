# restnodeprime
This is a fully REST compliant NodeJS server that uses absolutely no dependencies. None. Not even ExpressJS.

<ol>

    <h1>Server Configs REST API v1....of cake</h1>

    <h2>EndPoints</h2>

    <h3>/api/v1/login</h3>

    <p>This creates a new auth token for a user and returns it to the client via the response header.
        The client will have to check the Authorization key of the response header. The authentication scheme this
        rest API uses is "cake".
        On subsequent requests to the server, it is important to pass in this cake token as part of the
        Authorization request header.
        i.e. setHeader("Authorization","cake [that_token_you_got]")Description: </p>

    <ul>
        <li>
            Allowed methods: [POST]
        </li>
        <li>
            Params:
            <ul>
                <li>
                    username: a valid username
                </li>
                <li>
                    password: a valid password
                </li>
            </ul>
        </li>
        <li>
            Valid users:
            <p>
                hitman/Agent47 <br>
                cake/Lie443
            </p>
        </li>
    </ul>

    <h3>/api/v1/logout</h3>

    <p>invalidates the current session as identifeid in the auth header of this request.</p>
    <ul>
        <li>
            Allowed methods: [GET]
        </li>
        <li>
            Description:
        </li>
    </ul>

    <h3>/api/v1/configs/list</h3>

    <p>Gets single or multiple server configs depending on query filters. Supports paging and
        sorting.</p>
    <ul>
        <li>
            Allowed methods: [GET]
        </li>
        <li>
            Authentication required.
        </li>
        <li>
            Params:
            <ul>
                <li>
                    For Filtering: Use the name of the config attributes as part of query. e.g ?name=host1&port=8080
                </li>
                <li>
                    For paging: e.g. ?page=1&limit=4
                </li>
                <li>
                    For sorting: Use the sort parameter and '-' hyphen to determine sort and direction e.g. ?sort=port will sort by ports in Ascending order and ?sort=-port will sort by Descending.
                </li>
            </ul>
        </li>
    </ul>

    <h3>/api/v1/configs/create</h3>

    <p>Create a server config</p>
    <ul>
        <li>
            Allowed methods: [POST PUT]
        </li>
        <li>
            Authentication required.
        </li>
        <li>
            Required Params: name, hostname, port, username
        </li>

    </ul>

    <h3>/api/v1/configs/update</h3>

    <p>Either fully or partially updates a server config. For a partial update, use the PATCH method.</p>
    <ul>
        <li>
            Allowed methods: [POST PUT PATCH]
        </li>
        <li>
            Authentication required.
        </li>
        <li>
            Parameters:
            <ul>
                <li>
                    Required Params: name
                </li>
                <li>
                    Optional: hostname, port, username
                </li>
            </ul>
        </li>

    </ul>

    <h3>/api/v1/configs/delete</h3>

    <p>Deletes a server config</p>
    <ul>
        <li>
            Allowed methods: [POST DELETE]
        </li>
        <li>
            Authentication required.
        </li>
        <li>
            Required Params: name
        </li>

    </ul>
</ol>
<hr/>

</body>
</html>
