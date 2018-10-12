import React, { Component } from 'react';
import { ActivityIndicator,TextInput, View, StyleSheet, Text } from 'react-native';
import { Icon, Spinner, Picker, Button } from 'native-base';
import Modal from 'react-native-modal';
import { fetchUnsyncedList } from '../../redux/actions/InspectionList';

// My classes
import APIManager from "../../business/APIManager";
import UCMainManager from "../../business/UCMainManager"
import CommonStyles from '../../styles/Common'
import Common from '../../styles/Common'
import Util from '../../config/Util'

class AddrecModal extends Component {
	// ////////////
	// STATE
	constructor(props) {
		super(props);
		this.state = {
			actionDescription: props.actionType || [],
			comments: '',
			styleModelJobsite: {},
			loading: false,
		};
	}

	componentDidMount() {
		const { actionDescription } = this.state;
		console.log('dropdown', actionDescription);
	}

    //////////////////
    // AUTO COMPLETE
    // _findCustomer(custQuery) {
    //     if (custQuery === '') {
    //       return [];
    //     }    
    //     const { customers } = this.state;
    //     const regex = new RegExp(`${custQuery.trim()}`, 'i');
    //     return customers.filter(
    //         customer => customer.CustomerName.search(regex) >= 0);
    // }

    // _showSuggestions = (isShow) => {
    //     console.log(isShow)
    //     if (isShow === false)
    //         this.setState({ 
    //             styleSuggestion:{
    //                 zIndex: 1,
    //                 height: 42},
    //             styleModelJobsite:{zIndex: 2}})
    //     else
    //         this.setState({ 
    //             styleSuggestion:{zIndex: 99},
    //             styleModelJobsite:{} })
    // }

    // /////////////////
    // // UPDATE STATE
    // _updateCustomerState = (CustomerId, CustomerName) => {
    //     this.setState(
    //         { custQuery: CustomerName,
    //           selected: {
    //             customer: CustomerName,
    //             customerId: CustomerId,
    //             jobsite: this.state.selected.jobsite,
    //             jobsiteId: this.state.selected.jobsiteId,
    //             model: this.state.selected.model,
    //             modelId: this.state.selected.modelId,
    //           }})
    // }

    // _updateJobsiteState = (itemValue) => {

    //     // Get JobsiteName from array basing on index
    //     let jobsiteObj = null
    //     this.state.jobsites.forEach((element, index) => {
    //         if(element.JobsiteId === itemValue) {
    //             jobsiteObj = element
    //         }
    //     })
    //     if (jobsiteObj == null) return 

    //     // Update state
    //     this.setState(
    //         {selected: {
    //             customer: this.state.selected.customer,
    //             customerId: this.state.selected.customerId,
    //             jobsite: jobsiteObj.JobsiteName,
    //             jobsiteId: jobsiteObj.JobsiteId,
    //             model: this.state.selected.model,
    //             modelId: this.state.selected.modelId,
    //         }})
    // }

    // _updateModelState = (itemValue) => {
    //     let obj = null
    //     this.state.models.forEach((element, index) => {
    //         if(element.ModelId === itemValue) {
    //             obj = element
    //         }
    //     })
    //     if (obj == null) return 

    //     this.setState(
    //         {selected: {
    //             customer: this.state.selected.customer,
    //             customerId: this.state.selected.customerId,
    //             jobsite: this.state.selected.jobsite,
    //             jobsiteId: this.state.selected.jobsiteId,
    //             model: obj.ModelName,
    //             modelId: obj.ModelId,
    //         }})
    // }

    // _updateEquipmentState = (equipment) => {
    //     this.state.equipments.forEach((element, index) => {
    //         if(element.EquipmentId === equipment.EquipmentId) {
    //             this.state.equipments[index].selected
    //                 ? this.state.equipments[index].selected = false
    //                 : this.state.equipments[index].selected = true
    //         }
    //     })
    //     this.setState({ equipments: this.state.equipments })
    // }

    // /////////////////
    // // CALL APIs
    // _loadJobsite = (CustomerId) => {
    //     // Call API
    //     APIManager.GetJobsiteList(CustomerId, this.props.userId).then((response) => {
    //         console.log('GetJobsiteList')
    //         if (response != false)
    //         {
    //             // Success
    //             let data = response.GetJobsitesByCustomerResult
    //             if (data.length <= 0) return
                
    //             this.setState({ jobsites: data })
    //             this._updateJobsiteState(data[0].JobsiteId)
    //             this._loadModel(data[0].JobsiteId)
    //         } else {
    //             console.log(response)
    //         }
    //     })
    // }

    // _loadModel = (jobsiteId) => {
    //     // Call API
    //     APIManager.GetModelList(jobsiteId).then((response) => {
    //         console.log('GetModelList')
    //         if (response != false)
    //         {
    //             // Success
    //             let data = response.GetModelsByJobsiteResult

    //             if (data.length <= 0) return
                
    //             data.unshift( {"ModelId":0,"ModelName":"All Models"} )
    //             this.setState({ models: data })
    //             this._updateModelState(data[0].ModelId)
    //             this._loadEquipment(data[0].ModelId)                
    //         } else {
    //             console.log(response)
    //         }
    //     })
    // }

    // _loadEquipment = (modelId) => {
    //     // Call API
    //     let jobsiteId = this.state.selected.jobsiteId
    //     APIManager.GetEquipmentList(jobsiteId, modelId).then((response) => {
    //         console.log('GetEquipmentList')
    //         if (response != false)
    //         {
    //             // Success
    //             let data = response.GetEquipmentByJobsiteAndModelResult
    //             data = this._insertSelectAttr(data)
    //             this.setState({ equipments: data })
    //         } else {
    //             console.log(response)
    //         }
    //     })
    // }

    // _insertSelectAttr = (equipArray) => {                
    //     let newEquipArray = []
    //     for (let count = 0; count < equipArray.length; count++) {
    //         let equip = equipArray[count]
    //         equip.selected = false
    //         newEquipArray.push(equip)
    //     }
    //     return newEquipArray
    // }

    // ////////////////////
    // // ADD EQUIPMENT
    // _addEquipments = () => {

    //     // Loading
    //     this.setState({ loading:true })
        
    //     // Fix data
    //     let insertEquipments = []
    //     for (let i = 0; i < this.state.equipments.length; i++) {
    //         let equipment = this.state.equipments[i]
    //         if (equipment.selected === false)
    //             continue
    //         equipment.EquipmentJobsiteAuto = this.state.selected.jobsiteId
    //         equipment.EquipmentModel = this.state.selected.model
    //         equipment.EquipmentCustomer = this.state.selected.customer
    //         equipment.EquipmentJobsite = this.state.selected.jobsite
    //         equipment.CustomerAuto = this.state.selected.customerId
    //         equipment.EquipmentModelAuto = this.state.selected.modelId
            
    //         insertEquipments.push(equipment)
    //     }

    //     // Insert to database
    //     let equipmentAutoList = UCMainManager.getEquipmentList(insertEquipments)
    //     UCMainManager.downloadAndSaveData(equipmentAutoList)
    //     .then( (response) => {

    //         console.log('Done with download and save data')

    //         // Loading
    //         this.setState({ loading:false })

    //         // Close Modal
    //         this.props._onRequestClose()

    //         // Refresh UCMain screen
    //         this.props.fetchUnsyncedList()
    //     } )
    //     .catch() {

		// 		}
    // }
	picker() {
		const { actionDescription } = this.state;
		if (actionDescription.length === 0) {
			return null;
		}
		const pickerValues = actionDescription.map(item => (
			<Picker.Item
				key={item.action_type_auto}
				label={item.action_description}
				value={item.action_type_auto}
			/>
		));
		return pickerValues;
	}

	// ///////////////
	// RENDER UI

	render() {
		return (
			<Modal
				transparent
				animationType={"fade"}
				isVisible={this.props.isModalVisible}
			>
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<View style={styles.ModalInsideView}>
						<View style={styles.header}>
							<Text style={styles.headerText}>Add Recommondations</Text>
						</View>
						{/* ********************************************** Track Action Type */}
						<View style={[styles.jobsiteContainer, this.state.styleModelJobsite]}>
							<Picker
								iosHeader='Select Recommandations'
								iosIcon={<Icon name='arrow-down' style={{ color: 'blue', fontSize: 18 }} />}
								selectedValue={this.state.actionDescription.length > 0 ? this.state.actionDescription[0].action_type_auto : 'please' }
								style={styles.jobsite}
								onValueChange={
									(itemValue, itemIndex) => {
										this._updateJobsiteState(itemValue)
										this._loadModel(itemValue)
									}}
										>
											{ this.picker() }
                    </Picker>
            </View>
						<View style={styles.autocompleteWrapper}>
								<TextInput style={{ height: 100 }}
									placeholder='Comments'
									value={this.state.comments}
									multiline
									numberOfLines={3}
									onChangeText={(text) => this.setState({ comments: text })} 
								/>
						</View>
						{/* ************************************************ SAVE BUTTON */}
						<View style={styles.addBtnContainer}>
							<Button iconRight
											style={styles.addBtn}
											disabled={this.state.loading || this.props.isFetching 
													? true
													: false}
											onPress={() => {this._addEquipments()} }>
											{this.state.loading || this.props.isFetching
													? (<Spinner color={CommonStyles.COLOR_WHITE} />)
													: (<Text style={styles.addText}>Save</Text>)}
							</Button>
						</View>

						{/* **************************************** BUTTONS */}
						<View style={styles.bottomContainer}>
							<Button 
								style={styles.closeBtn}
								onPress={() => {this.props._onRequestClose()} }
							>
								<Text style={styles.closeText}>CLOSE</Text>
							</Button>
						</View>
          </View>
        </View>
      </Modal>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userId: state.auth.username,
        isFetching: state.InspectionList.isFetching
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUnsyncedList: () => { dispatch(fetchUnsyncedList()); },
    }
}

const modalWidth = 360
const styles = StyleSheet.create({
    ModalInsideView:{
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: CommonStyles.COLOR_WHITE,
        height: '60%',
        width: modalWidth,
        borderRadius:10,
        paddingTop: 24
    },
        header: {
            height: 50,
            marginLeft: -20,
            marginRight: -20,
            marginTop: -24,
            borderTopLeftRadius:10,
            borderTopRightRadius:10,
            backgroundColor: CommonStyles.COLOR_RED,
            justifyContent: 'center',
            alignItems: 'center'
        },
            headerText: {
                color: CommonStyles.COLOR_WHITE,
                fontSize: CommonStyles.FONT_SIZE_MEDIUM,
                fontWeight: 'bold'
            },
        autocompleteWrapper: {
            marginBottom: 20,
						marginTop: 30,
						backgroundColor: CommonStyles.COLOR_GREY,
        },
            autocompleteContainer: {
                backgroundColor: CommonStyles.COLOR_GREY,
                height: 40,
                fontSize: 17,
                padding: 7,
            }, 
                inputCustomer: {
                    paddingLeft: 5,
                    width: 500,
                    height: 42,
                    backgroundColor: CommonStyles.COLOR_GREY,
                },
                TextStyle:{       
                    fontSize: 20, 
                    marginBottom: 20, 
                    color: CommonStyles.COLOR_WHITE,
                    padding: 20,
                    textAlign: 'center'       
                },
        jobsiteContainer: {
            backgroundColor: CommonStyles.COLOR_WHITE,
            marginTop: 20,
        },
            jobsite: {
                backgroundColor: CommonStyles.COLOR_GREY,
                width: '100%',
                height: 42,
            },
        modelContainer: {
            backgroundColor: CommonStyles.COLOR_WHITE,
            marginTop: 3,
        },
            model: {
                backgroundColor: CommonStyles.COLOR_GREY,
                width: '100%',
                height: 42,
            },
        equipmentContainer: {
            backgroundColor: CommonStyles.COLOR_WHITE,
            marginTop: 3,
        },
            serialNo: {
                // color: CommonStyles.COLOR_WHITE,
                fontSize: Common.FONT_SIZE_BIGGER_REGULAR
            },
            checkBox: {
            },
        addBtnContainer: {
            backgroundColor: CommonStyles.COLOR_WHITE,
            marginTop: 3,
            alignSelf:'center'
        },
            addBtn: {
                width: modalWidth - 40,
                backgroundColor: CommonStyles.COLOR_RED,
                justifyContent: 'center'
            },
            addText: {
                color: CommonStyles.COLOR_WHITE,
                // fontWeight: 'bold',
                fontSize: Common.FONT_SIZE_BIGGER_REGULAR,
            },
        bottomContainer: {
            backgroundColor: CommonStyles.COLOR_WHITE,
            marginTop: 3,
            marginBottom: 20,
            alignSelf:'center',
            justifyContent: 'center'
        },
            closeBtn: {
                width: modalWidth - 40,
                backgroundColor: CommonStyles.COLOR_DARK_GREY,
                justifyContent: 'center'
            },
            closeText: {
                color: CommonStyles.COLOR_WHITE,
                // fontWeight: 'bold',
                fontSize: Common.FONT_SIZE_BIGGER_REGULAR,
            }
});


// const MyModal = hook(MyModalClass)
// export default connect(mapStateToProps, mapDispatchToProps)(
//     Util.ConstantHelper.isTest ? MyModal : MyModalClass
// )

export default AddrecModal;
