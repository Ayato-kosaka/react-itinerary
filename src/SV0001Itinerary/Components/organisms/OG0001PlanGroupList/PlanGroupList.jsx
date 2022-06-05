import * as useHK0001Utils from 'SV0000Common/Hooks/HK0001Utils'
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Styled_OG0005PlanGroup } from './style.js'

import CT0001PlanGroups from 'SV0001Itinerary/Hooks/contexts/CT0001PlanGroups'
import MC0006AddPlanGroupButton from 'SV0001Itinerary/Components/molecules/MC0006AddPlanGroupButton';

import Typography from '@material-ui/core/Typography';


const OG0001PlanGroupList = (props) => {
    const { t } = useTranslation();
    const { planGroups, swapPlan, removePlan, insertPlan } = useContext(CT0001PlanGroups);
    let dayNumber = 0;

    const onDragEnd = (result) => {
        if (!result.destination) { return; }
        if (result.source.droppableId == result.destination.droppableId) {
            swapPlan(result.source.droppableId, result.source.index, result.destination.index);
        }
        else {
            let removedPlanId = removePlan(result.source.droppableId, result.source.index);
            insertPlan(result.destination.droppableId, result.destination.index, removedPlanId);
        }
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                {planGroups.map((planGroup, index) => {
                    let straddleDayNum = Math.floor((planGroup.representiveStartTime - useHK0001Utils.zeroDate())/useHK0001Utils.milliSecondsADay) + 1 - dayNumber;
                    dayNumber += straddleDayNum
                    return(
                        <>
                            { !!straddleDayNum && <Typography variant="h4">{ dayNumber }{t('日目')}</Typography> }
                            <Styled_OG0005PlanGroup
                                key={planGroup.id}
                                index={index}
                            />
                        </>
                    )
                })}
            </DragDropContext>
            <MC0006AddPlanGroupButton />
        </>
    )
}
export default OG0001PlanGroupList;
