import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

interface Props {
    name: string;
    cost: number;
    cooldown: number;
    rarity: string;
    tags: Array<string>;
    effects: Array<string>;
}

export default function Item({ item }: { item: Props} ) {
    return (
    <Box sx={{ p: 2, border: '1px solid grey', borderRadius: 4, width: '100%'}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <p className="text-2xl font-bold">{item.name} ({item.cost})</p>
            <p>Cooldown: {item.cooldown}s</p>
        </Box>

        <Box className="flex gap-2">
            <Paper elevation={1} className="p-1">{item.rarity}</Paper>

            {item.tags.map(tag => (
                <Paper elevation={1} className="p-1">{tag}</Paper>
            ))}
        </Box>

        <Box sx={{ marginTop: "12px"}}>
            <ul className="list-disc list-inside">
                {item.effects.map(effect => (
                    <li>{effect}</li>
                ))}
            </ul>
        </Box>
    </Box>
    )
}