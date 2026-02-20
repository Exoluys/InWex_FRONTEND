const About = () => {
    const stats = [
        { value: "99.9%", label: "Uptime Guarantee" },
        { value: "24/7", label: "Support Available" },
        { value: "500+", label: "Active Users" },
        { value: "50K+", label: "Products Tracked" },
    ]

    return (
        <div className="mx-auto max-w-4xl px-6 w-full py-24">
            <div className="mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">About Our System</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                    Built with modern technologies and best practices to help businesses
                    of all sizes manage their inventory efficiently.
                </p>
            </div>

            <div className="grid gap-20 md:grid-cols-2 items-center">
                {/* Left Content */}
                <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Our Smart Warehouse Management System is designed to streamline
                        your inventory operations and provide real-time insights into
                        your warehouse performance.
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        We help businesses reduce costs and improve operational efficiency,
                        whether you&#39;re running a small warehouse or managing multiple
                        facilities.
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Our system scales with your needs and provides the tools
                        you need to succeed at every stage of growth.
                    </p>
                </div>

                {/* Stats — vertical stacked with thin dividers */}
                <div className="flex flex-col">
                    {stats.map(({ value, label }) => (
                        <div
                            key={label}
                            className="flex items-center justify-between py-5 border-b border-white/10 group"
                        >
                            <span className="text-sm text-muted-foreground tracking-widest uppercase">
                                {label}
                            </span>
                            <span className="text-3xl font-bold tabular-nums">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default About