import { Label } from "@/components/ui/label"
import { Switch as UiSwitch } from "@/components/ui/switch"

type SwitchType = {
    id?: string;
    label?: string;
    checked: boolean;
    setChecked: (_: boolean) => void;
}

export function Switch({ id, label, checked, setChecked }: SwitchType) {
    return (
        <div className="flex items-center space-x-2">
            <UiSwitch className="bg-primary text-blue-500" id={id} checked={checked} onCheckedChange={value => setChecked(value)} />
            {label &&
                <Label htmlFor={id}>{ label }</Label>}
        </div>
    )
}
