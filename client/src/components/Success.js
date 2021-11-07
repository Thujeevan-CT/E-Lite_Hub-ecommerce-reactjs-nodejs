import React, { useState, useEffect } from 'react';

export default function Success({ success }) {

    return (
        <div>
            <div className="alert alert-success" role="alert" style={{ fontWeight: "Bolder" }}>
                {success}
            </div>
        </div>
    );
}