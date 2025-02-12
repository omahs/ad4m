import {
  ActionIcon,
  Button,
  createStyles,
  Group,
  Space,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useCallback, useContext, useEffect, useState } from "react";
import { Copy, Qrcode as QRCodeIcon } from "tabler-icons-react";
import { Ad4minContext } from "../context/Ad4minContext";
import { AgentContext } from "../context/AgentContext";
import { invoke } from "@tauri-apps/api";
import QRCode from "react-qr-code";
import { buildAd4mClient } from "../util";
import { fetchProfile } from "./Settings";
import CardItems from "./CardItems";

const useStyles = createStyles((theme) => ({
  label: {
    color: theme.colors.dark[1],
  },
}));

function Profile() {
  const { classes } = useStyles();

  const {
    state: { loading },
    methods: { lockAgent },
  } = useContext(AgentContext);

  const {
    state: { url, did, isInitialized },
  } = useContext(Ad4minContext);

  const [password, setPassword] = useState("");
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [lockAgentModalOpen, setLockAgentModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });

  const fetchCurrentAgentProfile = useCallback(async () => {
    if (url) {
      const client = await buildAd4mClient(url);
      const agent = await client!.agent.me();

      const profile = await fetchProfile(agent);

      setProfile(profile);
    }
  }, [url]);

  // @ts-ignore
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (isInitialized) {
        lockAgent(password);
      }
    }
  };

  useEffect(() => {
    fetchCurrentAgentProfile();
  }, [fetchCurrentAgentProfile]);

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let { value } = event.target;
    setPassword(value);
  };

  return (
    <div>
      <j-popover placement="top">
        <j-button slot="trigger" variant="ghost" size="sm">
          <j-flex a="center">
            {profile.username}
            <j-box p="200"></j-box>
            <j-icon size="xs" name="chevron-down"></j-icon>
          </j-flex>
        </j-button>
        <j-menu slot="content">
          <j-menu-item onClick={() => setLockAgentModalOpen(true)}>
            Lock Agent
            <j-icon size="xs" slot="start" name="lock"></j-icon>
          </j-menu-item>
          <j-menu-item onClick={() => setShowProfileInfo(true)}>
            Profile details
            <j-icon size="xs" slot="start" name="info-circle"></j-icon>
          </j-menu-item>
          <j-menu-item onClick={() => invoke("close_application")}>
            Poweroff Agent
            <j-icon size="xs" slot="start" name="x-circle"></j-icon>
          </j-menu-item>
        </j-menu>
      </j-popover>
      <j-modal
        size="fullscreen"
        open={lockAgentModalOpen}
        onToggle={(e: any) => setLockAgentModalOpen(e.target.open)}
      >
        <j-box px="400" py="600">
          <j-box pb="500">
            <j-text nomargin size="600" color="black" weight="600">
              Lock Agent
            </j-text>
          </j-box>
          <j-box p="200"></j-box>
          <j-input
            placeholder="Password"
            label="Input your passphrase"
            type={showPassword ? "text" : "password"}
            size="lg"
            required
            onInput={onPasswordChange}
            onKeyDown={onKeyDown}
            autovalidate
          >
            <j-button
              onClick={() => setShowPassword(!showPassword)}
              slot="end"
              variant="link"
              square
            >
              <j-icon
                name={showPassword ? "eye-slash" : "eye"}
                size="sm"
              ></j-icon>
            </j-button>
          </j-input>
          <j-box p="200"></j-box>
            <j-button
              variant="primary"
              onClick={() => lockAgent(password)}
              loading={loading}
            >
              Lock agent
            </j-button>
        </j-box>
      </j-modal>
      <j-modal
        size="fullscreen"
        open={showProfileInfo}
        onToggle={(e: any) => setShowProfileInfo(e.target.open)}
      >
        <j-box px="400" py="600">
          <j-box pb="900">
            <j-text nomargin color="black" size="600" weight="600">
              Profile details
            </j-text>
          </j-box>
          <div style={{ padding: "24px" }}>
            <CardItems title="Agent ID" value={did as string} titleUnderline />
            <j-box p="200" />
            <CardItems
              title="Username"
              value={profile?.username}
              titleUnderline
            />
            <j-box p="200" />
            <CardItems
              title="Name"
              value={`${profile.firstName} ${profile.lastName}`}
              titleUnderline
            />
            <j-box p="200" />
          </div>
          <j-box p="200"></j-box>
          <j-flex>
            <j-button onClick={() => setShowProfileInfo(false)}>Close</j-button>
          </j-flex>
        </j-box>
      </j-modal>
    </div>
  );
}

export default Profile;
