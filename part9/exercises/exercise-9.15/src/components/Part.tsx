import { CoursePart } from '../types'

const styleGroup = {
  marginBottom: '.5rem',
}

const styleBlock = {
  display: 'block',
}

const styleBold = {
  fontWeight: 'bold',
}

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div style={styleGroup}>
          <span style={{ ...styleBlock, ...styleBold }}>
            {part.name} {part.exerciseCount}
          </span>
          <span style={styleBlock}>
            <i>{part.description}</i>
          </span>
        </div>
      )
    case 'group':
      return (
        <div style={styleGroup}>
          <span style={{ ...styleBlock, ...styleBold }}>
            {part.name} <span>{part.exerciseCount}</span>
          </span>
          <span>project exercise {part.groupProjectCount}</span>
        </div>
      )
    case 'background':
      return (
        <div style={styleGroup}>
          <span style={{ ...styleBlock, ...styleBold }}>
            {part.name} <span>{part.exerciseCount}</span>
          </span>
          <span style={styleBlock}>
            <i>{part.description}</i>
          </span>
          <span>submit to {part.backgroundMaterial}</span>
        </div>
      )
    case 'special':
      return (
        <div style={styleGroup}>
          <span style={{ ...styleBlock, ...styleBold }}>
            {part.name} <span>{part.exerciseCount}</span>
          </span>
          <span style={styleBlock}>
            <i>{part.description}</i>
          </span>
          <div>
            <ul>
              {part.requirements.map((r) => (
                <li key={r}>{r} </li>
              ))}
            </ul>
          </div>
        </div>
      )
  }
}

export default Part
