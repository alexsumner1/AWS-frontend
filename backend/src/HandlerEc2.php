<?php

namespace Raines\Serverless;

use \Aws\Ec2\Ec2Client;

class Ec2Handler implements Handler
{
    /**
     * {@inheritdoc}
     */
    public function handle(array $event, Context $context)
    {
        $logger = $context->getLogger();
        $logger->notice('Got event', $event);

        $ec2Client = new Ec2Client([
            'region' => 'us-west-2',
            'version' => '2016-11-15',
            'profile' => 'default'
        ]);

        return json_encode($ec2Client->describeInstances());
    }
}
