import React from "react";

export default function Loader() {
    return (
        <div className='mt-5'>
            <div className="spinner-border mt-5" role="status" style={{ width: '100px', height: '100px' }}>
                <span className="sr-only" style={{ fontWeight: "Bolder" }}>Loading...</span>
            </div>
        </div>
    );
}