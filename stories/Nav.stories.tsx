import { Divider, List, ThemeProvider, Typography } from '@committed/components'
import Backup from '@material-ui/icons/BackupSharp'
import Clear from '@material-ui/icons/ClearSharp'
import Delete from '@material-ui/icons/DeleteSharp'
import Folder from '@material-ui/icons/FolderSharp'
import Forward from '@material-ui/icons/ForwardSharp'
import OfflinePin from '@material-ui/icons/OfflinePinSharp'
import People from '@material-ui/icons/PeopleSharp'
import Publish from '@material-ui/icons/PublishSharp'
import Schedule from '@material-ui/icons/ScheduleSharp'
import Settings from '@material-ui/icons/SettingsSharp'
import Star from '@material-ui/icons/StarSharp'
import React, { useRef } from 'react'
import { Nav, NavListItem, Root } from '../src'

export default {
  title: 'Components/Nav',
  component: Nav,
}

// export const Use = () => {
//   return (
//     <ThemeProvider>
//       <Root contained style={{ minHeight: '50vh' }}>
//         <Nav>
//           <Typography>This is the Nav</Typography>
//         </Nav>
//       </Root>
//     </ThemeProvider>
//   )
// }

export const CustomIcons = () => {
  return (
   <div>
   <ThemeProvider>
      <Root contained style={{ minHeight: '50vh' }}>
        <Nav
          collapseIcon={<Clear />}
          expandIcon={<Forward />}
          >
          <Typography>This is the Nav</Typography>
        </Nav>
      </Root>
    </ThemeProvider>
    </div>
  )
}

// export const WithContent = () => {
//   const list = [
//     {
//       primaryText: 'My Files',
//       icon: <Folder />,
//     },
//     {
//       primaryText: 'Shared with me',
//       icon: <People />,
//     },
//     {
//       primaryText: 'Starred',
//       icon: <Star />,
//     },
//     {
//       primaryText: 'Recent',
//       icon: <Schedule />,
//     },
//     {
//       primaryText: 'Offline',
//       icon: <OfflinePin />,
//     },
//     {
//       primaryText: 'Uploads',
//       icon: <Publish />,
//     },
//     {
//       primaryText: 'Backups',
//       icon: <Backup />,
//     },
//     {
//       primaryText: 'Trash',
//       icon: <Delete />,
//     },
//   ]
//   return (
//     <ThemeProvider>
//       <Root contained style={{ minHeight: '50vh' }}>
//         <Nav>
//           <List>
//             {list.map(({ primaryText, icon }, i) => (
//               <NavListItem
//                 key={primaryText}
//                 selected={i === 0}
//                 icon={icon}
//                 text={primaryText}
//               />
//             ))}
//             <Divider style={{ margin: '12px 0' }} />
//             <NavListItem icon={<Settings />} text={'Settings & account'} />
//           </List>
//         </Nav>
//       </Root>
//     </ThemeProvider>
//   )
// }
