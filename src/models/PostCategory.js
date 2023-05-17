module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        post_id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        category_id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
        }
    }, {
        undescored: true,
        timestamps: false,
        tableName: 'posts_categories',
    });
    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, {
            as: 'categories',
            through: PostCategory,
            foreignkey: 'post_id',
            otherKey: 'category_id',
        });
        models.Category.belongsToMany(models.BlogPost, {
            as: 'posts',
            through: PostCategory,
            foreignkey: 'category_id',
            otherKey: 'post_id',
        });
    }
    return PostCategory;
}