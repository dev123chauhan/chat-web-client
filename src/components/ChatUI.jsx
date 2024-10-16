import { Box, Typography, TextField, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, InputAdornment, useMediaQuery, Drawer } from '@mui/material';
import { Home, Chat, Notifications, Settings, Search, Phone, Videocam, MoreVert, AttachFile, EmojiEmotionsOutlined, Mic, Logout, CameraAlt, Menu } from '@mui/icons-material';
import { setDrawerOpen, setSelectedChat } from '../reducer/chatReducer';
import { useSelector, useDispatch } from 'react-redux';
import user1 from "../assets/user1.jpg";

const ChatUI = () => {
  const dispatch = useDispatch();
  const { drawerOpen, selectedChat, groups, people, messages } = useSelector(state => state.chat);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(min-width:601px) and (max-width:960px)');

  const handleDrawerToggle = () => {
    dispatch(setDrawerOpen(!drawerOpen));
  };

  const handleChatSelect = (chat) => {
    dispatch(setSelectedChat(chat));
    dispatch(setDrawerOpen(false));
  };

  const LeftSidebar = () => (
    <Box sx={{
      width: isMobile ? '100%' : 80,
      bgcolor: '#091057',
      display: 'flex',
      flexDirection: isMobile ? 'row' : 'column',
      alignItems: 'center',
      justifyContent: isMobile ? 'space-around' : 'flex-start',
      py: isMobile ? 1 : 2,
      height: isMobile ? 'auto' : '100%'
    }}>
      <Avatar src={user1} sx={{ width: 56, height: 56, mb: isMobile ? 0 : 4 }} />
      <IconButton className='iconColor' color="inherit"><Home /></IconButton>
      <IconButton className='iconColor' color="inherit" sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: isMobile ? 0 : 1 }}><Chat /></IconButton>
      <IconButton className='iconColor' color="inherit"><Notifications /></IconButton>
      <IconButton className='iconColor' color="inherit"><Settings /></IconButton>
      {!isMobile && (
        <Box sx={{ mt: 'auto' }}>
          <IconButton className='iconColor' color="inherit"><Logout /></IconButton>
        </Box>
      )}
    </Box>
  );

  const ChatList = () => (
    <Box sx={{ width: '100%', bgcolor: 'white', borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Typography variant="subtitle1" sx={{ px: 2, py: 1, fontWeight: 'bold' }}>Groups</Typography>
      <List dense>
        {groups.map((group) => (
          <ListItem 
            key={group.name} 
            secondaryAction={group.unread && 
              <Avatar sx={{ bgcolor: '#FF3B30', width: 20, height: 20, fontSize: '0.75rem' }}>{group.unread}</Avatar>
            }
            onClick={() => handleChatSelect(group)}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemAvatar>
              <Avatar src={group.img}>{group.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary={group.name} 
              secondary={`${group.lastMessage} — ${group.time}`}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="subtitle1" sx={{ px: 2, py: 1, fontWeight: 'bold' }}>People</Typography>
      <List dense sx={{ overflow: 'auto', flexGrow: 1 }}>
        {people.map((person) => (
          <ListItem 
            key={person.name} 
            secondaryAction={person.unread ? 
              <Avatar sx={{ bgcolor: '#FF3B30', width: 20, height: 20, fontSize: '0.75rem' }}>{person.unread}</Avatar> :
              (person.online && <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#4CD964' }} />)
            }
            onClick={() => handleChatSelect(person)}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemAvatar>
              <Avatar src={person.img}>{person.name[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary={person.name} 
              secondary={`${person.status} — ${person.time}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const ChatWindow = () => (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: 'white', height: '100%' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && (
            <IconButton onClick={handleDrawerToggle} sx={{ mr: 1 }}>
              <Menu />
            </IconButton>
          )}
          <Avatar src={selectedChat?.img || ''} sx={{ mr: 2 }}/>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{selectedChat?.name || 'Select a chat'}</Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedChat?.online ? 'Online' : 'Offline'} - Last seen, 2:02pm
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton><Phone color="primary" /></IconButton>
          <IconButton><Videocam color="primary" /></IconButton>
          <IconButton><MoreVert color="inherit"/></IconButton>
        </Box>
      </Box>

      <Box sx={{ flex: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {messages.map((message, index) => (
          <Box key={index} sx={{ alignSelf: message.sender === 'me' ? 'flex-end' : 'flex-start', mb: 1, maxWidth: '70%' }}>
            <Paper elevation={0} sx={{ p: 1, bgcolor: message.sender === 'me' ? '#091057' : '#f0f0f0', borderRadius: 2 }}>
              <Typography variant="body1" sx={{ color: message.sender === 'me' ? 'white' : 'inherit' }}>{message.text}</Typography>
            </Paper>
            <Typography variant="caption" sx={{ mt: 0.5, display: 'block', textAlign: message.sender === 'me' ? 'right' : 'left' }}>{message.time}</Typography>
          </Box>
        ))}
      </Box>

      <Paper elevation={3} sx={{ p: 1, m: 2, display: 'flex', alignItems: 'center', borderRadius: 3 }}>
        <IconButton size="small"><AttachFile /></IconButton>
        <TextField
          fullWidth
          variant="standard"
          placeholder="Type your message here..."
          InputProps={{ disableUnderline: true }}
          sx={{ mx: 1 }}
        />
        <IconButton size="small"><EmojiEmotionsOutlined /></IconButton>
        <IconButton size="small"><CameraAlt /></IconButton>
        <IconButton size="small" sx={{ bgcolor: '#091057', color: 'white', '&:hover': { bgcolor: '#091057' } }}><Mic /></IconButton>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f0f2f5' }}>
      {!isMobile && <LeftSidebar />}
      {(!isMobile && !isTablet) && (
        <Box sx={{ width: 350, display: 'flex', flexDirection: 'column' }}>
          <ChatList />
        </Box>
      )}
      {(isMobile || isTablet) && (
        <Drawer
          anchor={isMobile ? 'left' : 'right'}
          open={drawerOpen}
          onClose={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': {
              width: isMobile ? '100%' : 350,
              boxSizing: 'border-box',
            },
          }}
        >
          {isMobile && <LeftSidebar />}
          <ChatList />
        </Drawer>
      )}
      <ChatWindow />
    </Box>
  );
};

export default ChatUI;