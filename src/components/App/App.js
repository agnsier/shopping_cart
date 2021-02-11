import React from 'react';
import '../../sass/App.scss';
import ProductsList from "../Products/ProductsList";

const App = () => {
    return (
        <div className="container">
            <ProductsList/>
        </div>
    );
};

export {
    App
};
