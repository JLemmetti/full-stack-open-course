const notificationStyles = {
  color: 'green',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
}

const errorStyles = {
  color: 'red',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
}

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={type === 'notification' ? notificationStyles : errorStyles}>
      {message}
    </div>
  )
}

export default Notification
