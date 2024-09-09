
interface ModalProps {
    data: any[];
    searchText: string;
}

export const useModal = ({ data, searchText }: ModalProps) => {
    let columnas = [];


    const filterData = (data: any[]) => {
        columnas = data.filter(item => 
            Object.values(item).some(value => 
                value.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }

    return {
        filterData

    }
}
