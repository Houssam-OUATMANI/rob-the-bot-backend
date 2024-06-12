import { connect, set } from "mongoose"

export async function dbConnect(): Promise<void> {
    try {
        const { MONGODB_URI, MONGODB_DEBUG_MODE } = process.env
        await connect(MONGODB_URI as string)
        // Log Queries if true
        set("debug", !!Number(MONGODB_DEBUG_MODE))
        console.info("Connected to MongoDB")
    }
    catch {
        console.error("Error While Connecting to Database")
    }
}