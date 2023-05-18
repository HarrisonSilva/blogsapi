module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'categories',
    });
    return Category;
}