import React, { Component } from 'react'

import {
    Icon56AccessibilityOutline,
    Icon56PaletteOutline
} from '@vkontakte/icons';

import {
    Alert,
    Button,
    ButtonGroup,
    Div,
    Group,
    ModalCard,
    ModalPage,
    ModalPageHeader,
    ModalRoot,
    PanelHeaderClose,
    PanelSpinner,
    Placeholder,
    PullToRefresh,
    ScreenSpinner,
    SimpleCell,
    SplitCol,
    SplitLayout,
    Switch
} from '@vkontakte/vkui';

export default class Popouts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeModal: null
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showScreenSpinner = this.showScreenSpinner.bind(this);
        this.showPanelLoading = this.showPanelLoading.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    openModal(id) {
        this.setState({ activeModal: id });
    }

    closeModal() {
        this.setState({ activeModal: null });
    }

    showScreenSpinner() {
        this.props.setPopout(<ScreenSpinner size="large" />)
        this.timeout = setTimeout(() => this.props.setPopout(null), 5000);
    }

    showPanelLoading() {
        this.props.setLoading(true);
        this.timeout = setTimeout(() => this.props.setLoading(false), 5000);
    }

    onRefresh() {
        this.props.setLoading(true);
        this.setState({ isFetching: true });
        this.timeout = setTimeout(() => {
            this.props.setLoading(false);
            this.setState({ isFetching: false });
        }, 2000);
    }

    showAlert() {
        this.props.setPopout(
            <Alert
                actions={[
                    {
                        title: "Удалить",
                        mode: "destructive",
                        autoclose: true,
                        action: () => console.log("Нажатие на кнопку \"Удалить\"")
                    },
                    {
                        title: "Отмена",
                        mode: "cancel",
                        autoclose: true
                    }
                ]}
                actionsLayout="horizontal"
                onClose={() => this.props.setPopout(null)}
                header="Удаление документа"
                text="Вы уверены, что хотите удалить этот документ?"
            />
        )
    }

    componentDidMount() {
        this.timeout = setTimeout(() => this.props.setLoading(false), 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        const modal = (
            <ModalRoot activeModal={this.state.activeModal}>
                <ModalPage
                    id="modalPage"
                    header={
                        <ModalPageHeader
                            right={
                                this.props.isMobile && <PanelHeaderClose onClick={this.closeModal} />
                            }
                        >
                            Модальное окно
                        </ModalPageHeader>
                    }
                    onClose={this.closeModal}
                    settlingHeight={100}
                >
                    <Div>
                        Test
                    </Div>
                </ModalPage>
                <ModalCard
                    id="modalCard"
                    header={"Модальная карточка"}
                    subheader={"Текст модальной карточки"}
                    actions={
                        <Button size="l" mode="primary">Кнопка</Button>
                    }
                    icon={<Icon56AccessibilityOutline />}
                    onClose={this.closeModal}
                    style={this.props.isMobile ? { marginTop: "-45px" } : {}}
                />
            </ModalRoot>
        )

        return (
            <SplitLayout modal={modal}>
                <SplitCol>
                    <PullToRefresh
                        onRefresh={this.onRefresh}
                        isFetching={this.state.isFetching}
                    >
                        {this.props.isLoading ? <PanelSpinner /> : (
                            <>
                                <Group>
                                    <ButtonGroup
                                        mode="vertical"
                                        stretched
                                    >
                                        <Button stretched appearance="accent" size="m" onClick={() => this.openModal("modalPage")}>Открыть модальное окно</Button>
                                        <Button stretched appearance="negative" size="m" onClick={() => this.openModal("modalCard")}>Открыть модальную карточку</Button>
                                    </ButtonGroup>


                                </Group>

                                <Group>
                                    <ButtonGroup
                                        mode="vertical"
                                        stretched
                                    >
                                        <Button stretched appearance="neutral" size="m" onClick={() => this.showScreenSpinner()}>Запустить долгий процесс</Button>
                                        <Button stretched appearance="overlay" size="m" onClick={() => this.showPanelLoading()}>Загрузка панели</Button>
                                        <Button stretched appearance="positive" size="m" onClick={() => this.showAlert()}>Показать Alert</Button>
                                    </ButtonGroup>
                                </Group>

                                <Group>
                                    <SimpleCell
                                        disabled
                                        after={<Switch
                                            checked={this.props.showPopoutsIcon}
                                            onChange={() => this.props.setShowPopoutsIcon(!this.props.showPopoutsIcon)}
                                        />}
                                    >
                                        Показывать иконку в меню
                                    </SimpleCell>
                                    <SimpleCell
                                        disabled
                                        after={<Switch
                                            disabled
                                        />
                                        }
                                    >
                                        Заблокированный Switch
                                    </SimpleCell>
                                    <SimpleCell
                                        disabled
                                        after={<Switch
                                            disabled
                                            checked
                                        />
                                        }
                                    >
                                        Заблокированный Switch 2.0
                                    </SimpleCell>
                                </Group>

                                <Group>
                                    <SimpleCell
                                        disabled
                                    >
                                        Кстати, тут есть PullToRefresh.
                                    </SimpleCell>
                                    <Placeholder icon={<Icon56PaletteOutline fill='#ff8700' />}>

                                    </Placeholder>
                                </Group>
                            </>)
                        }
                    </PullToRefresh>
                </SplitCol>
            </SplitLayout>
        )
    }
}
