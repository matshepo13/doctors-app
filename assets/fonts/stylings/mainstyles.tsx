import { StyleSheet } from 'react-native';

// Define Colors object
const Colors = {
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
    borderColor: 'hsl(186, 72%, 24%)',
    borderRadius: 25,
    padding: 15,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
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
    backgroundColor: '#F5F5F5', // Grayish background color
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 15,
    width: '100%', // Increase the width
    alignSelf: 'center',
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
  professionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.aliceBlue,
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  professionIcon: {
    marginRight: 8,
  },
  professionText: {
    color: Colors.midnightGreen,
    fontWeight: 'bold',
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
});