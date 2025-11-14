
import { useState, useMemo } from 'react'
import { PatchEvent, set } from 'sanity'
import { Box, Grid, Stack, TextInput, Button, Flex } from '@sanity/ui'
import Icon from '@repo/sanity-web/src/components/Icons'

interface IconPickerInputProps {
    value: string
    onChange: (event: PatchEvent) => void
    schemaType: {
        options?: {
            allowedGroups?: string[]
            showGroupFilter?: boolean
            itemsPerLoad?: number
            columns?: number
        }
    }
}

const IconPickerInput = ({ value, onChange, schemaType }: IconPickerInputProps) => {
    const allIcons = [
        { title: 'Facebook', value: 'facebook', group: 'social' },
        { title: 'Instagram', value: 'instagram', group: 'social' },
        { title: 'LinkedIn', value: 'linkedin', group: 'social' },
        { title: 'Twitter', value: 'twitter', group: 'social' },
        { title: 'Google', value: 'google', group: 'social' },
        { title: 'Youtube', value: 'youtube', group: 'social' },
        { title: 'Snapchat', value: 'snapchat', group: 'social' },
        { title: 'Pinterest', value: 'pinterest', group: 'social' },
        { title: 'Figma', value: 'figma', group: 'ss' },
        { title: 'Dribble', value: 'dribble', group: 'ss' },
        { title: 'Reddit', value: 'reddit', group: 'social' },
        { title: 'Discord', value: 'discord', group: 'social' },
        { title: 'Tiktok', value: 'tiktok', group: 'social' },
        { title: 'Clubhouse', value: 'clubhouse', group: 'icon' },
        { title: 'Slack', value: 'slack', group: 'icon' },
    ]

    // Get options from schema
    const options = schemaType?.options || {}
    const allowedGroups = options.allowedGroups
    const showGroupFilter = options.showGroupFilter ?? false
    const ITEMS_PER_LOAD = options.itemsPerLoad ?? 10
    const columns = options.columns ?? 6

    const [searchQuery, setSearchQuery] = useState('')
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD)
    const [selectedGroup, setSelectedGroup] = useState<string>('all')

    // Filter icons based on allowed groups
    const icons = useMemo(() => {
        if (!allowedGroups || allowedGroups.length === 0) {
            return allIcons
        }
        return allIcons.filter(icon => allowedGroups.includes(icon.group))
    }, [allowedGroups])

    // Get unique groups for filter buttons
    const availableGroups = useMemo(() => {
        const groups = [...new Set(icons.map(icon => icon.group))]
        return groups.sort()
    }, [icons])

    const handleClick = (value: string) => {
        onChange(PatchEvent.from(set(value)))
    }

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + ITEMS_PER_LOAD)
    }

    const handleGroupFilter = (group: string) => {
        setSelectedGroup(group)
        setVisibleCount(ITEMS_PER_LOAD) // Reset visible count
    }

    // Apply filters
    const filteredIcons = useMemo(() => {
        let filtered = icons

        // Apply group filter
        if (selectedGroup !== 'all') {
            filtered = filtered.filter(icon => icon.group === selectedGroup)
        }

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(icon =>
                icon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                icon.group.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        return filtered
    }, [icons, selectedGroup, searchQuery])

    const visibleIcons = filteredIcons.slice(0, visibleCount)
    const hasMore = visibleCount < filteredIcons.length

    // Reset visible count when search changes
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.currentTarget.value)
        setVisibleCount(ITEMS_PER_LOAD)
    }

    const getGroupDisplayName = (group: string) => {
        const groupNames: Record<string, string> = {
            social: 'Sociale',
            business: 'Business',
            tech: 'Teknologi',
            design: 'Design'
        }
        return groupNames[group] || group.charAt(0).toUpperCase() + group.slice(1)
    }

    return (
        <Stack space={3}>
            <Box>
                <TextInput
                    type="text"
                    className="w-full"
                    placeholder="Søg efter ikon..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </Box>

            {showGroupFilter && availableGroups.length > 1 && (
                <Box>
                    <Flex gap={2} wrap="wrap">
                        <Button
                            mode={selectedGroup === 'all' ? 'default' : 'ghost'}
                            tone={selectedGroup === 'all' ? 'primary' : 'default'}
                            text="Alle"
                            onClick={() => handleGroupFilter('all')}
                            size={1}
                        />
                        {availableGroups.map(group => (
                            <Button
                                key={group}
                                mode={selectedGroup === group ? 'default' : 'ghost'}
                                tone={selectedGroup === group ? 'primary' : 'default'}
                                text={getGroupDisplayName(group)}
                                onClick={() => handleGroupFilter(group)}
                                size={1}
                            />
                        ))}
                    </Flex>
                </Box>
            )}

            <Box>
                <Grid
                    columns={columns}
                    gap={2}
                >
                    {visibleIcons.map((icon) => (
                        <button
                            key={icon.value}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0.375rem',
                                background: value === icon.value ? '#6FCF97' : '#fff',
                                aspectRatio: '1 / 1',
                                width: '100%',
                                border: '1px solid rgba(0,0,0,0.2)',
                                borderRadius: '0.375rem',
                                boxShadow: value === icon.value ? '0 4px 12px rgba(0,0,0,0.15)' : undefined,
                                transition: 'background 0.2s, box-shadow 0.2s',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleClick(icon.value)}
                            onMouseEnter={e => {
                                if (value !== icon.value) {
                                    (e.currentTarget as HTMLButtonElement).style.background = '#e6f9ef'
                                }
                            }}
                            onMouseLeave={e => {
                                if (value !== icon.value) {
                                    (e.currentTarget as HTMLButtonElement).style.background = '#fff'
                                }
                            }}
                        >
                            <Icon
                                className=""
                                type={icon.value}
                                style={{
                                    width: '2rem',
                                    height: '2rem',
                                    fill: '#222',
                                }}
                            />
                            <span
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'center',
                                    marginTop: '0.25rem',
                                    fontSize: '0.75rem',
                                    lineHeight: '1',
                                }}
                            >
                                {icon.title}
                            </span>
                        </button>
                    ))}
                </Grid>
            </Box>

            {hasMore && (
                <Box paddingTop={2}>
                    <Button
                        mode="ghost"
                        tone="primary"
                        text="Indlæs flere ikoner"
                        onClick={handleLoadMore}
                        style={{ width: '100%' }}
                    />
                </Box>
            )}

            {filteredIcons.length > 0 && (
                <Box paddingTop={1}>
                    <span style={{
                        fontSize: '0.75rem',
                        color: '#666',
                        textAlign: 'center',
                        display: 'block'
                    }}>
                        Viser {visibleIcons.length} af {filteredIcons.length} ikoner
                        {selectedGroup !== 'all' && ` i ${getGroupDisplayName(selectedGroup)}`}
                    </span>
                </Box>
            )}

            {filteredIcons.length === 0 && searchQuery && (
                <Box paddingTop={2}>
                    <span style={{
                        fontSize: '0.875rem',
                        color: '#999',
                        textAlign: 'center',
                        display: 'block'
                    }}>
                        Ingen ikoner fundet for "{searchQuery}"
                    </span>
                </Box>
            )}
        </Stack>
    )
}

export default IconPickerInput
