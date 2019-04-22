import {createConnection, Connection} from "typeorm";

let connection: Connection

export default async function getConnection(): Promise<Connection> {
    if (!connection) {
        connection = await createConnection()
    }
    return connection
}