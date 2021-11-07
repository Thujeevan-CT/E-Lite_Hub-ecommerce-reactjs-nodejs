module.exports = (sequelize, DataTypes) => {

    const reviews = sequelize.define("reviews", {
        reviewid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        }

    })

    return reviews;
}
