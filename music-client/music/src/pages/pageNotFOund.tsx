import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Sorry</h2>
            <p>page cannot be found</p>
            <Link to='/login'>Back to the login page...</Link>
        </div>
    )
}
