const Edit = ({...props}) => {
    return (
        <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-6m-1.586-3.586L19.5 7.328A2 2 0 0016.672 4.5l-1.086 1.086m2.828 2.828l-6.036 6.037a2 2 0 01-1.022.546l-2.942.589.589-2.942a2 2 0 01.547-1.022l6.036-6.036m2.828 2.828l-2.828-2.828"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
  }
  
  export default Edit