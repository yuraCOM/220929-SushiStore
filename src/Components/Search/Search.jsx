import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

const Search = observer((props) => {

    const [findText, setFindText] = useState('')

    function find(txt) {
        props.setFindFlag(true)
        txt = txt.toLowerCase()

        if (!txt) {
            alert('Nothing found.....')
        }

        else {
            let searchDB = props.allUsers.filter(item => {
                return item["userName"].toString().toLowerCase().includes(txt)
                    || item["userPhone"].toString().toLowerCase().includes(txt)
                    || item["userEmail"].toString().toLowerCase().includes(txt)
            }
            )

            if (!searchDB.length) {
                alert('Ничего не найдено')

            } else {
                props.setAllUsers(searchDB)
            }

        }
        setFindText('')
    }

    function clearSearch() {
        props.setFindFlag(false)
        props.setAllUsers([])
        props.fetchData()

    }

    return (
        <InputGroup className="mb-0">
            <Form.Control
                onChange={(e) => setFindText(e.target.value)}
                placeholder="Поиск..."
                value={findText}
            />
            <Button
                onClick={() => find(findText)}
                variant="outline-secondary"
                id="button-addon2">
                Найти
            </Button>
            <Button
                onClick={() => clearSearch()}
                variant="outline-warning"
                id="button-addon2">
                X
            </Button>
        </InputGroup>
    )
})

export default Search