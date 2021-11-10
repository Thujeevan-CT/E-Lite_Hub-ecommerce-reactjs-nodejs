import React, { useState, useEffect } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import Userslist from './Userslist'
import Orderslist from './Orderslist'
import Addproduct from './Addproduct'
import Productslist from './Productslist'
import Editproduct from './Editproduct'

export default function Adminscreen() {

    return (
        <div>

            <div className="row justify-content-center mt-2">
                <div className="col-md-10">
                    <h2>Admin Panel</h2>
                    <ul className='admin p-2'>
                        <li><NavLink activeClassName="adminActive" to='/admin/userslist' style={{ color: 'black', fontSize: '1.2rem', fontWeight: '600' }}>UsersList</NavLink></li>
                        <li><NavLink activeClassName="adminActive" to='/admin/productslist' style={{ color: 'black', fontWeight: '600' }}>Products List</NavLink></li>
                        <li><NavLink activeClassName="adminActive" to='/admin/addnewproduct' style={{ color: 'black', fontWeight: '600' }}>Add New Product</NavLink></li>
                        <li><NavLink activeClassName="adminActive" to='/admin/orderslist' style={{ color: 'black', fontWeight: '600' }}>Orderslist</NavLink></li>
                    </ul>
                    <Switch>
                        <Route path='/admin/' component={Userslist} exact />
                        <Route path='/admin/userslist' component={Userslist} />
                        <Route path='/admin/orderslist' component={Orderslist} />
                        <Route path='/admin/addnewproduct' component={Addproduct} />
                        <Route path='/admin/productslist' component={Productslist} />
                        <Route path='/admin/editproduct/:productid' component={Editproduct} />
                    </Switch>

                </div>
            </div>

        </div>
    )
}