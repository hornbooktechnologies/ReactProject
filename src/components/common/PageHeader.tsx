const PageHeader = ({title, description}:any) => {
  return (
    <>
      <div className="uk-main-title">
        <h3>{title}</h3>
        <p className="uk-text-description">
         {description}
        </p>
      </div>
    </>
  )
}

export default PageHeader
