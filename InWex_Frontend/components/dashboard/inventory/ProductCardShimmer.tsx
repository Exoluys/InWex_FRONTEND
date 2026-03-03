import { Card, CardContent, CardFooter } from "@/components/ui/card"

export const ProductCardShimmer = () => {
    return (
        <Card className="w-full rounded-xl overflow-hidden bg-[#1E1E1E] p-0 border-none animate-pulse">

            <div className="h-60 bg-zinc-800" />

            <CardContent className="px-4 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="h-6 w-24 bg-zinc-800 rounded-md" />
                    <div className="h-6 w-16 bg-zinc-800 rounded-md" />
                </div>

                <div className="h-6 w-3/4 bg-zinc-800 rounded-md" />

                <div className="space-y-2">
                    <div className="h-4 w-full bg-zinc-800 rounded-md" />
                    <div className="h-4 w-2/3 bg-zinc-800 rounded-md" />
                </div>

                <div className="h-4 w-1/3 bg-zinc-800 rounded-md" />
            </CardContent>

            <CardFooter className="px-4 pb-6 flex justify-end">
                <div className="h-10 w-32 bg-zinc-800 rounded-md" />
            </CardFooter>
        </Card>
    )
}