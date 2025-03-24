import { useState } from "react";
import { Card, CardBody } from "../components/Card";
import Divider from "../components/Divider";

export function ConfusionMatrix() {
    const [active, setActive] = useState<string>('chart');

    return (
        <div className="mt-24 max-w-4xl mx-auto">
            <Card>
                <CardBody className={'flex items-center gap-7'}>
                    <div
                        onClick={() => setActive('chart')}
                        className={`uppercase hover:text-primary-dark hover:underline cursor-pointer ${active === 'chart' && 'text-primary-light'} `}
                    >
                        CHART
                    </div>
                    <div
                        onClick={() => setActive('cm')}
                        className={`uppercase hover:text-primary-dark hover:underline cursor-pointer ${active === 'cm' && 'text-primary-light'} `}
                    >
                        Confusion Matrix
                    </div>
                </CardBody>
                <Divider />
                {active === 'chart' ? (
                    <CardBody>
                        <div className={'grid gap-4'}>
                            <img alt={''} className={'w-full'} src={'/assets/hasilA.png'} />
                            <img alt={''} className={'w-full'} src={'/assets/hasilB.png'} />
                        </div>
                    </CardBody>
                ) : (
                    <CardBody>
                        <div className={'grid gap-4 grid-cols-3'}>
                            <img alt={''} className={'w-full'} src={'/assets/cmA.png'} />
                            <img alt={''} className={'w-full'} src={'/assets/cmB.png'} />
                            <img alt={''} className={'w-full'} src={'/assets/cmC.png'} />
                            <img alt={''} className={'w-full'} src={'/assets/cmD.png'} />
                            <img alt={''} className={'w-full'} src={'/assets/cmD.png'} />
                            <img alt={''} className={'w-full'} src={'/assets/cmD.png'} />
                        </div>
                    </CardBody>
                )}
            </Card>
        </div>
    )
}