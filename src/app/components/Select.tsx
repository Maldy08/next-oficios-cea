import { useState } from "react";

export const Select = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    }

    return (
        <div>
            <h1>Select</h1>
            <select className="border border-gray-300 rounded p-2 w-full text-sm" title="select" name="select" value={selectedOption!} onChange={handleChange}>
                <option value="">Seleccione una opción</option>
                <option value="opcion1">Opción 1</option>
                <option value="opcion2">Opción 2</option>
                <option value="opcion3">Opción 3</option>
            </select>
            {selectedOption && <p>Has seleccionado: {selectedOption}</p>}
        </div>
    )
}
