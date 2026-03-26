import Grid from "@/components/Grid";
import Rules from "@/components/Rules";

export default function Home() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center py-20 bg-gray-100/50">
            <h1 className="mb-8 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900 drop-shadow-sm text-center">
                The Recursive Grid
            </h1>
            <Grid />
            <Rules />
        </main>
    );
}
