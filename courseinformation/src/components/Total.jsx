const Total = ({ parts }) => {
    const total = parts.reduce((accumulator, obj) => {
        return accumulator + obj.exercises
    }, 0)

    return (
        <b>Total of {total} exercises</b>
    )
}

export default Total;