import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Menu, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; // or 'react-native-vector-icons/MaterialIcons'
import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';

const RepositoryList = () => {
  const [visible, setVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState('latest');
  const { repositories, loading } = useRepositories(sortOrder);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (value) => {
    setSortOrder(value);
    closeMenu();
  };

  const getLabel = () => {
    if (sortOrder === 'latest') return 'Latest repositories';
    if (sortOrder === 'highest') return 'Highest rated repositories';
    if (sortOrder === 'lowest') return 'Lowest rated repositories';
    return 'Select';
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.menuWrapper}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button
              mode="outlined"
              onPress={openMenu}
              contentStyle={styles.buttonContent}
              style={styles.fullButton}
              labelStyle={{ justifyContent: 'space-between', flex: 1 }}
              icon={({ size, color }) => (
                <MaterialIcons name="arrow-drop-down" size={24} color={color} />
              )}
            >
              {getLabel()}
            </Button>
          }
          style={styles.menuStyle}
        >
          <Menu.Item onPress={() => handleSelect('latest')} title="Latest repositories" />
          <Menu.Item onPress={() => handleSelect('highest')} title="Highest rated repositories" />
          <Menu.Item onPress={() => handleSelect('lowest')} title="Lowest rated repositories" />
        </Menu>
      </View>

      <RepositoryListContainer
        repositories={repositories}
        loading={loading}
        singleView={false}
        pickerValue={sortOrder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuWrapper: {
    zIndex: 1000,
    padding: 10,
    backgroundColor: 'white',
  },
  fullButton: {
    width: Dimensions.get('window').width - 20, // Full width minus padding
  },
  buttonContent: {
    flexDirection: 'row-reverse', // Arrow on right
    justifyContent: 'space-between',
  },
  menuStyle: {
    width: Dimensions.get('window').width - 20, // Match the button width
  },
});

export default RepositoryList;
