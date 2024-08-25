// import React from 'react';
// import { View, Text, Image, TouchableOpacity } from 'react-native';
// import { styles } from '@/assets/fonts/stylings/mainstyles';
// import { FontAwesome } from '@expo/vector-icons';

// interface AppointmentCardProps {
//   appointment: any;
// }

// const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
//   const date = new Date(appointment.date);
//   const month = date.toLocaleString('default', { month: 'short' });
//   const day = date.getDate();

//   return (
//     <View style={styles.appointmentCard}>
//       <View style={styles.appointmentDateContainer}>
//         <Text style={styles.appointmentMonth}>{month}</Text>
//         <Text style={styles.appointmentDay}>{day}</Text>
//       </View>
//       <View style={styles.appointmentDetails}>
//         <Text style={styles.appointmentType}>{appointment.type}</Text>
//         <Text style={styles.appointmentDoctor}>{appointment.doctor}</Text>
//         <View style={styles.appointmentIcons}>
//           <FontAwesome name="phone" size={16} color="#000" />
//           <FontAwesome name="video-camera" size={16} color="#000" />
//         </View>
//       </View>
//     </View>
//   );
// };

// export default AppointmentCard;