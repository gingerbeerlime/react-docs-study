import { recipes } from '../data/recipe'

interface RecipeProps {
  id: string
  name: string
  ingredients: string[]
}

const Recipe = ({ id, name, ingredients }: RecipeProps) => {
  return (
    <>
      <h2>{name}</h2>
      <ul>
        {ingredients.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </>
  )
}

const RecipeList = () => {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map((recipe) => (
        <Recipe key={recipe.id} {...recipe} />
      ))}
    </div>
  )
}

export default RecipeList
