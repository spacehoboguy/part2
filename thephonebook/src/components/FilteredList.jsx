const FilteredList = ({persons, filter, handleDeletePerson }) => {

    return (
        <ul>
        {
          persons.filter(p => p.name.toUpperCase().includes(filter.toUpperCase())).map(fp => (
            <li key={fp.id}>{fp.name} {fp.number} 
            <button onClick={()=> {handleDeletePerson(fp.id)}}>delete</button>
            </li>
          ))
        }
      </ul>
    )
}

export default FilteredList