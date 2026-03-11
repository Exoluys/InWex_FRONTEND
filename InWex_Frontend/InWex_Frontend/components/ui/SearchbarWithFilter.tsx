"use client"

import { Funnel, Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import { Button } from "./button"

type FilterItem = {
    label: string
    value: string
}

type SearchbarProps = {
    filters: FilterItem[]
    onFilterSelect?: (value: string) => void
    onSearch?: (value: string) => void
}

const SearchbarWithFilter = ({ filters, onFilterSelect, onSearch }: SearchbarProps) => {
    return (
        <div className="flex gap-3 md:gap-5 items-center w-full">

            <InputGroup className="bg-zinc-950 border-none w-full max-w-110 h-11 pl-4 rounded-xl focus-within:ring-1 focus-within:ring-zinc-700 transition-all">
                <InputGroupInput
                    placeholder="Search"
                    className="placeholder:text-zinc-600 text-zinc-100 bg-transparent"
                    onChange={(e) => onSearch?.(e.target.value)}
                />
                <InputGroupAddon>
                    <Search className="h-5! w-5! text-zinc-600" />
                </InputGroupAddon>
            </InputGroup>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="secondary"
                        className="h-11 px-5 cursor-pointer rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white border-none transition-all flex items-center gap-2"
                    >
                        <Funnel className="h-4! w-4!" />
                        <span className="text-sm font-medium hidden xs:inline">Filter</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    side="bottom"
                    align="end"
                    sideOffset={8}
                    className="px-1.5 py-1.5 rounded-xl bg-zinc-950 text-zinc-100 border-none shadow-2xl min-w-45"
                >
                    {filters.map((item) => (
                        <DropdownMenuItem
                            key={item.value}
                            className="rounded-lg cursor-pointer focus:bg-zinc-800 focus:text-white py-2.5 px-3 text-sm transition-colors"
                            onClick={() => onFilterSelect?.(item.value)}
                        >
                            {item.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default SearchbarWithFilter