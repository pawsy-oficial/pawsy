import * as Select from "@radix-ui/react-select";
import { CaretDown } from "@phosphor-icons/react";
import { memo } from "react";

function SelectPetsVaccine({ pets, setNamePet, name }) {
    return (
        <Select.Root 
            value={pets.nm_pet} 
            onValueChange={setNamePet}
        >
            <Select.Trigger
                className="lg:min-w-[220px] w-80 flex items-center justify-between rounded px-6 py-2 text-2xl font-semibold leading-none h-8 gap-1 bg-white focus:outline-none"
                aria-label="pet"
            >
                <Select.Value 
                    className="font-sora" 
                    aria-label={pets.nm_pet}
                >
                    {name}
                </Select.Value>
                <CaretDown weight="fill" />
            </Select.Trigger>
            <Select.Portal>
                <Select.Content className="z-50 overflow-hidden bg-white rounded-md">
                    <Select.Viewport className="px-3 py-8">
                        <Select.Group>
                            <Select.Label className="text-xs text-gray-500 mb-6">
                                Meus pets
                            </Select.Label>
                            {
                                pets.map((name, index) => {
                                    return (
                                        <Select.Item
                                            value={`${name.nm_pet}`}
                                            className="text-gray-800 cursor-pointer hover:outline-none hover:text-gray-950 text-xl capitalize"
                                        >
                                            <Select.ItemText>
                                                {name.nm_pet}
                                            </Select.ItemText>
                                        </Select.Item>
                                    );
                                })
                            }
                        </Select.Group>
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}

const memoSelectPets = memo(SelectPetsVaccine)
export { memoSelectPets as SelectPetsVaccine };