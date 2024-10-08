import { StyleSheet } from 'react-native';

// Define Colors object
export const Colors = {
  aliceBlue: '#F0F8FF',
  white: '#FFFFFF',
  grayWeb: '#808080',
  verdigris: '#40E0D0',
  gainsboro: '#DCDCDC',
  black: '#000000',
  midnightGreen: '#004953',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Move the container up
    paddingTop: 20, // Add some padding at the top
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'hsl(186, 100%, 19%)',
    textAlign: 'center',
    marginBottom: 20,
  },
  calendar: {
    borderWidth: 0,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    height: 320, // Decreased height of the calendar
    width: '100%', 
    borderRadius: 10,
    padding: 10,
  },
  selectedDateContainer: {
    marginTop: 5, // Moved up a bit
  },
  selectedDate: {
    fontSize: 16,
    color: 'hsl(186, 100%, 19%)',
    textAlign: 'center',
    marginBottom: 10,
    marginTop:5,
  },
  appointmentDetailsContainer: {
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    marginTop: 5, // Moved up a bit
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16, 
    borderTopWidth: 1,
    borderTopColor: Colors.gainsboro,
    position: 'absolute', 
    bottom: 0, 
    width: '170%',
    marginLeft: 5, 
    backgroundColor: 'transparent', 
  },
  navItem: {
    alignItems: 'center',
    padding: 16, 
    marginRight: 20, 
    color: Colors.midnightGreen, 
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'hsl(186, 72%, 24%)',
    borderRadius: 10,
    width: '96%',
    alignSelf: 'center',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'hsl(186, 100%, 19%)',
    marginBottom: 20,
    textAlign: 'center',
  },
  
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'transparent', // Transparent border color
    borderRadius: 25,
    padding: 15,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000', // Added shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  dashboardContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderRadius: 10,
  },
  scrollView: {
    flex: 1,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  greetingContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    borderWidth: 2,
    borderColor: Colors.white, // Changed border color to white
    borderRadius: 15,
    width: '96%',
    alignSelf: 'center',
    marginTop: 16,
  },

  greetingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80, // Increase the width
    height: 80, // Increase the height
    borderRadius: 40, // Adjust the border radius accordingly
    marginRight: 16,
  },
  greetingTextContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.midnightGreen,
  },
  subGreeting: {
    fontSize: 14,
    color: Colors.grayWeb,
    marginTop: 4,
  },
  sectionContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: Colors.white,
    width: '96%',
    alignSelf: 'center',    
    borderColor: Colors.white, 
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    borderWidth: 2,
    borderRadius: 15,
  },

  

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.midnightGreen,
    marginBottom: 16,
  },
  conditionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.aliceBlue,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  conditionText: {
    marginLeft: 8,
    color: Colors.midnightGreen,
  },
  medicalRecordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '105%',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'transparent', // Make the border invisible
    borderRadius: 12,
    padding: 8,
  },
  medicalRecordItem: {
    width: '48%', // Reduce width to create space between items
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderColor: 'hsl(182, 100%, 35%)',
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicalRecordImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  medicalRecordTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: Colors.midnightGreen,
  },
  medicalRecordDate: {
    fontSize: 12,
    color: Colors.grayWeb,
    marginTop: 4,
  },
  viewButton: {
    backgroundColor: 'transparent',
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
    alignItems: 'center',
    borderColor: 'hsl(182, 100%, 35%)',
    borderWidth: 1,
  },
  viewButtonText: {
    color: 'hsl(182, 100%, 35%)',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  findPatientContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginVertical: 16,
    color: 'black',
  },
  findPatientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    color: 'hsl(186, 72%, 24%)',
  },
  findPatientTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'black', // Change the color to black
},
  findPatientSeeAll: {
    fontSize: 14,
    color: 'hsl(186, 72%, 24%)',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  cameraIcon: {
    marginLeft: 8,
  },

  appointmentCard: {
    width: 200,
    height: 250,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  appointmentReason: {
    fontSize: 14,
    marginBottom: 5,
  },
  appointmentDepartment: {
    fontSize: 14,
    marginBottom: 5,
  },
  appointmentPatient: {
    fontSize: 14,
  },

  appointmentDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  viewAppointmentButton: {
    padding: 10,
    backgroundColor: 'hsl(182, 100%, 35%)',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  viewAppointmentButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },

  professionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  professionIcon: {
    marginRight: 5,
  },
  professionText: {
    fontSize: 16,
    color: '#333',
  },
  appointmentFirstName: {
    fontSize: 14,
    marginBottom: 5,
  },
  appointmentMedicalHistory: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: 'white', // Changed border color to white
    fontSize: 16,
    color: 'hsl(186, 72%, 24%)',
    height: 40, // Decreased height
    borderRadius: 10, // Added border radius
    shadowColor: '#000', // Added shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5, // Increased shadow opacity for more shininess
    shadowRadius: 4,
    elevation: 5, // Increased elevation for more shininess
  },
  vitalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vitalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '48%', // Adjust width to fit two items per row
  },
  vitalText: {
    fontSize: 16,
    color: '#000',
  },
  vitalIcon: {
    marginRight: 8, // Example style, adjust as needed
  },
  infoCard: {
    width: 200,
    height: 175,
    marginRight: 10,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  cardOverlay: {
    backgroundColor: 'rgba(240, 248, 255, 0.7)', // aliceblue with transparency
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'hsl(186, 100%, 19%)',
  },
  cardDate: {
    fontSize: 14,
    color: 'hsl(186, 100%, 19%)',
    marginBottom: 5,
  },
  
});