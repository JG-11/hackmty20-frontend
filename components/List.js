import { Table } from 'react-bootstrap'

const List = props => {
    let i = 0

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Username
                    </th>
                </tr>
            </thead>
            <tbody>
            {
                props.data.map(name => {
                
                i++
                
                return (
                    <tr key={i}>
                        <td>
                            { i }
                        </td>
                        <td>
                            { name }
                        </td>
                    </tr>
                )})
            }
            </tbody>
        </Table>
    )
}

export default List