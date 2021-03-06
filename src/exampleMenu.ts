import { MolgenisMenu } from './types'

const molgenisMenu: MolgenisMenu = {
  menu: {
    type: 'menu',
    id: 'main',
    label: 'Home',
    items: [
      {
        type: 'plugin',
        id: 'home',
        label: 'Home'
      },
      {
        type: 'menu',
        id: 'importdata',
        label: 'Import data',
        items: [
          {
            type: 'plugin',
            id: 'one-click-importer',
            label: 'Quick data import'
          },
          {
            type: 'plugin',
            id: 'importwizard',
            label: 'Advanced data import'
          }
        ]
      },
      {
        type: 'plugin',
        id: 'navigator',
        label: 'Navigator'
      },
      {
        type: 'plugin',
        id: 'dataexplorer',
        label: 'Data Explorer',
        params: 'selectedEntityType=sys_md_EntityType'
      },
      {
        type: 'menu',
        id: 'dataintegration',
        label: 'Data Integration',
        items: [
          {
            type: 'plugin',
            id: 'metadata-manager',
            label: 'Metadata Manager'
          },
          {
            type: 'menu',
            id: 'submenu',
            label: 'Submenu',
            items: [
              {
                type: 'plugin',
                id: 'sorta',
                label: 'SORTA'
              },
              {
                type: 'menu',
                id: 'subsubmenu',
                label: 'Sub Sub Menu',
                items: [
                  {
                    type: 'plugin',
                    id: 'background',
                    label: 'Test',
                    'params': ''
                  }
                ]
              },
              {
                type: 'plugin',
                id: 'mappingservice',
                label: 'Mapping Service'
              }
            ]
          },
          {
            type: 'plugin',
            id: 'tagwizard',
            label: 'Tag Wizard'
          }
        ]
      },
      {
        type: 'menu',
        id: 'plugins',
        label: 'Plugins',
        items: [
          {
            type: 'plugin',
            id: 'searchAll',
            label: 'Search all data'
          },
          {
            type: 'plugin',
            id: 'swagger',
            label: 'API documentation'
          },
          {
            type: 'plugin',
            id: 'appmanager',
            label: 'App manager'
          },
          {
            type: 'plugin',
            id: 'feedback',
            label: 'Feedback'
          },
          {
            type: 'plugin',
            id: 'jobs',
            label: 'Job overview'
          },
          {
            type: 'plugin',
            id: 'questionnaires',
            label: 'Questionnaires'
          },
          {
            type: 'plugin',
            id: 'scripts',
            label: 'Scripts'
          }
        ]
      },
      {
        type: 'menu',
        id: 'admin',
        label: 'Admin',
        items: [
          {
            type: 'plugin',
            id: 'indexmanager',
            label: 'Index manager'
          },
          {
            type: 'plugin',
            id: 'logmanager',
            label: 'Log manager'
          },
          {
            type: 'plugin',
            id: 'menumanager',
            label: 'Menu Manager'
          },
          {
            type: 'plugin',
            id: 'permissionmanager',
            label: 'Permission Manager'
          },
          {
            type: 'plugin',
            id: 'scheduledjobs',
            label: 'Scheduled Jobs'
          },
          {
            type: 'plugin',
            id: 'settingsmanager',
            label: 'Settings'
          },
          {
            type: 'plugin',
            id: 'thememanager',
            label: 'Theme Manager'
          },
          {
            type: 'plugin',
            id: 'usermanager',
            label: 'User Manager'
          },
          {
            type: 'plugin',
            id: 'security-ui',
            label: 'Security Manager'
          }
        ]
      },
      {
        type: 'plugin',
        id: 'useraccount',
        label: 'Account'
      }
    ]
  },
  navBarLogo: '/img/logo_molgenis_small.png',
  selectedPlugin: 'navigator',
  authenticated: true,
  loginHref: '/login',
  helpLink: {
    label: 'Help',
    href: 'https://molgenis.gitbooks.io/molgenis/content/'
  }
}

export default molgenisMenu
