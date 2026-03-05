import { Card, CardContent } from "@/components/ui/card";
import { KPICardProps } from "@/lib/types/AnalysisTypes";

export default function KPICard({ title, value, subValue, icon }: KPICardProps) {
    return (
        <Card className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-zinc-500">{title}</p>
                        <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
                        <p className="text-xs text-zinc-400 mt-1">{subValue}</p>
                    </div>
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}