import React from 'react'

const MenuItems = [
  {
    title: 'Sider',
    url: '/structure/sider',
    addUrl: '/intent/create/template=page;type=page/',
  },
  {
    title: 'Begivenheder',
    url: '/structure/nyheder',
    addUrl: '/intent/create/template=event;type=event/',
  },
  {
    title: 'Artikler',
    url: '/structure/artikler;artikler',
    addUrl: '/intent/create/template=article;type=article/',
  },
  {
    title: 'Medarbejdere',
    url: '/structure/employees',
    addUrl: '/intent/create/template=employee;type=employee/',
  },
  {
    title: 'Indstillinger',
    url: '/structure/indstillinger',
    addUrl: '',
  },
  {
    title: 'Menu',
    url: '/structure/',
    addUrl: '',
  },
]

const LinksWidget = ({ NEXT_PUBLIC_BASE_URL }: any) => {
  return (
    <div className="links-widget-wrapper ">
      <div className="grow">
        <h3 className="links-widget-heading">Genveje</h3>{' '}
        <div>
          <ul className="links-widget-ul ">
            {MenuItems.map((item, index) => (
              <li className="links-widget-ul-item " key={index}>
                <a className="links-widget-ul-item-a " href={item.url}>
                  {item.title}
                </a>
                {item.addUrl && (
                  <>
                    <span className="links-widget-ul-item-line"></span>
                    <a className="links-widget-ul-item-plus " href={item.addUrl}>
                      +
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-auto">
        <ul className="links-widget-ul">
          <li className="links-widget-ul-item">
            <a
              className="links-widget-ul-item-a"
              href={`https://sanity.io/manage/project/${NEXT_PUBLIC_BASE_URL}/members`}
            >
              + Tilføj bruger
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LinksWidget
