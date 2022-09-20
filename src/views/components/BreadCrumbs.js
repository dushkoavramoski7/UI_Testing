function BreadCrumbs({breadCrumbsItems, breadCrumbsActive}) {
    return (
        <div className="row wrapper border-bottom white-bg page-heading">
            <div className="col-lg-10">
                <h2>{breadCrumbsActive}</h2>
                <ol className="breadcrumb">
                    {breadCrumbsItems.map((item) => (
                        <li className="breadcrumb-item" key={item.name}>
                            <a href={item.href}>{item.name}</a>
                        </li>
                    ))}
                    <li className="breadcrumb-item active">
                        <strong>{breadCrumbsActive}</strong>
                    </li>
                </ol>
            </div>
            <div className="col-lg-2">

            </div>
        </div>
    );
}
export default BreadCrumbs;