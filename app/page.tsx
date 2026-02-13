import Grid from "@/components/Grid";

export default function Home() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white">
            <h1 className="mb-8 text-5xl font-bold text-gray-800">The Recursive Grid</h1>
            <Grid />
        </main>
    );
}
