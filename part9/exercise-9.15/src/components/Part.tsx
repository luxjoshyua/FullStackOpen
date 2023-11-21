import { CoursePart } from '../types'

const styleGroup = {
  marginBottom: '.5rem',
}

const styleBlock = {
  display: 'block',
}

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return (
        <div style={styleGroup}>
          <span style={styleBlock}>
            {part.name} {part.exerciseCount}
          </span>
          <span>
            <i>{part.description}</i>
          </span>
        </div>
      )
    case 'group':
      return (
        <div style={styleGroup}>
          <span style={styleBlock}>
            {part.name} <span>{part.exerciseCount}</span>
          </span>
          <span>project exercise {part.groupProjectCount}</span>
        </div>
      )
    case 'background':
      return (
        <div style={styleGroup}>
          <span style={styleBlock}>
            {part.name} <span>{part.exerciseCount}</span>
          </span>
          <span>
            <i>{part.description}</i>
          </span>
          <span>submit to {part.backgroundMaterial}</span>
        </div>
      )
  }
}

export default Part
