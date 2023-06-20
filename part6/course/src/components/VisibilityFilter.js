import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()
  // name attribute is the same, so they form a button group where only one option can be selected

  return (
    <div>
      <div style={{ marginRight: '1rem' }}>
        all{' '}
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange('ALL'))}
          style={{ margin: '0' }}
        />
      </div>
      <div style={{ marginRight: '1rem' }}>
        important{' '}
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange('IMPORTANT'))}
          style={{ margin: '0' }}
        />
      </div>
      <div style={{ marginRight: '1rem' }}>
        {' '}
        nonimportant{' '}
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange('NONIMPORTANT'))}
          style={{ margin: '0' }}
        />
      </div>
    </div>
  )
}

export default VisibilityFilter
