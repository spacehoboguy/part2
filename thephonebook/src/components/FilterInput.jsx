const FilterInput = ({ filter, handleFilterChange }) => {
    return (
        <>
            filter <input type="text" value={filter} onChange={handleFilterChange} />
        </>
    )
}

export default FilterInput