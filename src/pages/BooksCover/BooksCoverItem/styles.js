import { StyleSheet } from 'react-native';
import { general, metrics, colors } from '../../../Styles';
// diego
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...general.box,
    marginTop: metrics.baseMargin,
    alignItems: 'center',
    maxWidth: (metrics.screenWidth - 60) / 2,
  },

    avatar: {
        width: 80,
        height: 80,
    },

    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.darker,
        marginTop: metrics.baseMargin,
    }
});

export default styles;
