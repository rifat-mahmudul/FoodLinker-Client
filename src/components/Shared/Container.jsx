import PropTypes from 'prop-types'

const Container = ({children}) => {
    return (
        <div className='max-w-[90%] xl:max-w-[1200px] mx-auto'>
            {children}
        </div>
    )
}

Container.propTypes = {
    children: PropTypes.node.isRequired
}

export default Container
